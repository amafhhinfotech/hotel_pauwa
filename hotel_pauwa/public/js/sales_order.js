frappe.ui.form.on('Sales Order', {
refresh:function(frm){

if(frm.doc.docstatus==1){
       frm.add_custom_button(__('Room Folio'), function() {

            if(frm.doc.number_of_room <=2){
            var check_room_folio=frappe.db.get_value("Room Folio",{'booking_order':frm.doc.name},'name',(r) => {
             if(r.name!=null){
             
             frappe.set_route("Form", "Room Folio",r.name)
             }
             else{
                
	       frappe.model.open_mapped_doc({
	          method: 'hotel_pauwa.hotel_pauwa.doctype.sales_order.doc_mapped_SaleOrder_to_room_folia',
	          frm:cur_frm
	          });
	   
             
             }
            })
          }
	});
    }



},

night_stay_(frm){
   frappe.call({
     method: 'hotel_pauwa.hotel_pauwa.doctype.sales_order.check_out_date',
     args: {
      'doc':frm.doc
        },
     callback: function(r) {
        frm.set_value("check_out_",r.message)
            
      }    
                     
   });

 },
 number_of_room(frm){
          if(frm.doc.night_stay_==null){
              frm.set_value('number_of_room',"")
             frappe.throw("Enter Number of Night First")
             
          }
          else{
             frappe.call({
        method: 'hotel_pauwa.hotel_pauwa.doctype.sales_order.insert_items',
        args: {
        'doc':frm.doc
             },
         callback: function(r) {
               console.log(r)
              if(r.message){
              cur_frm.get_field("items").grid.grid_rows[0].remove();
              cur_frm.refresh();
              var childTable = cur_frm.add_child("items")
              childTable.item_code=r.message.room_pakage;
              childTable.qty=r.message.night_stay;
              childTable.delivery_date=r.message.check_in_date
              //childTable.reservation_date_to=r.message[3]
              childTable.item_name=r.message.room_pakage
              childTable.rate=frm.doc.room_rate
              childTable.description=r.message.room_package_description[0]
              childTable.uom=r.message.room_package_description[1]
              //cur_frm.refresh_fields("invoice_schedule")
              
              }  
              
         }    
                     
         });
       }  
   }

})
