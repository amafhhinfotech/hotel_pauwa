frappe.listview_settings['Room Folio'] = {
    
    get_indicator: function(doc){
        const status_color = {
                "Checked Out":"red",
                "Pre-Check In":"gray",
                "Checked In":"green"

            };
        
         if(doc.status==="Checked In"){
            return [__(doc.status),status_color[doc.status]]
        }
        if(doc.status==="Checked Out"){
            
            return [__(doc.status),status_color[doc.status]]
        }
        if(doc.status==="Pre-Check In"){
            return [__(doc.status),status_color[doc.status]]
        }
       
        if(doc.status==="Skipper"){
            return [__(doc.status),status_color[doc.status]]
        }
        
    }
}

