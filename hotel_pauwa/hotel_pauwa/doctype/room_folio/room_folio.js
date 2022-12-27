// Copyright (c) 2022, Amafhh Infotech and contributors
// For license information, please see license.txt

frappe.ui.form.on('Room Folio', {
	// refresh: function(frm) {

	// }
refresh: function(frm) {
  if(frm.doc.docstatus==1){
     cur_frm.add_custom_button(__('Create Pyment'), function(){
     
   }, __("Create")).css({'border-color':'red','color':'black','border':'2px solid black'});
   
   cur_frm.add_custom_button(__('Create Invoice'), function(){
     
   }, __("Create")).css({'border-color':'red','color':'black','border':'2px solid black'});
  }
  
   
  
  if(frm.doc.docstatus==1){
     cur_frm.add_custom_button(__('Restaurant'), function(){
     
   }, __("Add-on-services")).css({'border-color':'red','color':'black','border':'2px solid black'});
   
   cur_frm.add_custom_button(__('Bar'), function(){
     
   }, __("Add-on-services")).css({'border-color':'red','color':'black','border':'2px solid black'});
   
   cur_frm.add_custom_button(__('Laundry'), function(){
     
   }, __("Add-on-services")).css({'border-color':'red','color':'black','border':'2px solid black'});
   
  }
  
  if(frm.doc.sign_in_sheet_and_attachment==null && frm.doc.docstatus==1 && frm.doc.status=="Pre-Check In" ){ 
               frm.add_custom_button(__('Make Sign In sheet and Attacment'), function(){
                   let sheet = frappe.model.get_new_doc('Sign In Sheet and Attachment');
                   sheet.room_folio = cur_frm.doc.name;
                   sheet.customer_email=cur_frm.doc.customer_email;
                   sheet.customer_mobile=cur_frm.doc.customer_mobile_no;
               frappe.set_route("Form", sheet.doctype, sheet.name);
            
    }, __("Action Process")).css({'border-color':'red','color':'black','border':'2px solid black'});
 } 
  
   if(frm.doc.docstatus==1 && frm.doc.status=="Pre-Check In"){
           frm.add_custom_button(__('Check-In'), function(){
               frm.set_value("status","Checked In")
               frm.save('Update')
               frm.refresh();
           },__("Action Process")).css({'border-color':'red','color':'black','border':'2px solid black'});     
    }       
    if(frm.doc.docstatus==1 && frm.doc.status=="Checked In"){
       frm.add_custom_button(__('Check-Out'), function(){
          frm.set_value("status","Checked Out")
          frm.set_value("check_out",frappe.datetime.now_datetime())
          frm.save('Update')
          frm.refresh();
       },__("Action Process")).css({'border-color':'red','color':'black','border':'2px solid black'});
    }
  
},
before_submit(frm){
 
   frm.set_value("status","Pre-Check In")
 
 }

});
