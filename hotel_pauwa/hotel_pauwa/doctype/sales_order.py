import frappe
import json
from datetime import datetime ,timedelta
import calendar
from dateutil.relativedelta import relativedelta
from frappe.model.mapper import get_mapped_doc

@frappe.whitelist()
def check_out_date(doc):
    doc=json.loads(doc)
    if doc.get('night_stay_') and doc.get('check_in'):
       check_in=str(doc.get('check_in'))
       checkIn_strp=datetime. strptime(check_in,"%Y-%m-%d")
       checkInformate=datetime(checkIn_strp.year,checkIn_strp.month,checkIn_strp.day)
       checkOutdate = checkInformate + relativedelta(days=(int(doc.get('night_stay_'))))
       return checkOutdate.date()
       
       
       
@frappe.whitelist()
def insert_items(doc):
    doc=json.loads(doc)
    item_details={}
    if doc.get("night_stay_") and doc.get('number_of_room'):
       room_pakage=doc.get('room_with_package')
       night_stay= float(doc.get('night_stay_')) * doc.get('number_of_room') 
       check_in_date=doc.get('check_in')
       check_out_date = doc.get('check_out_')
       room_package_description=frappe.db.get_value('Item',{'name':doc.get('room_with_package')},['description','stock_uom'])
       item_details.update({"room_pakage":room_pakage,"night_stay":night_stay,"check_in_date":check_in_date,
       "check_out_date":check_out_date,"room_package_description":room_package_description})
       return item_details
       
       
       
       
       
       
       
       
@frappe.whitelist()
def doc_mapped_SaleOrder_to_room_folia(source_name, target_doc=None):
    #print(doc.name)
    target_doc = get_mapped_doc("Sales Order", source_name,
       {
        "Sales Order": {
            "doctype": "Room Folio",
            "field_map": {  
                "name": "booking_order",
                "customer":"customer",
                "any_notes":"remember_notes",
                "type_of_room":"room_type",
                "room_no":"room_no",
                "room_with_package":"room_package",
                "check_out_":"check_out",
                "night_stay_":"no_of_nights",
                "room_rate":"room_rate",
                "contact_mobile":"customer_mobile_no",
                "contact_email": "customer_email"
              
            },
        }
           }, target_doc)
      
    return target_doc       
       
       
       
       
