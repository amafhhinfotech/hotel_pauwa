# Copyright (c) 2022, Amafhh Infotech and contributors
# For license information, please see license.txt

import json
import frappe
from frappe.model.document import Document


class Bar(Document):

    # pass

    def before_submit(self):
     
        sales_order = frappe.get_doc('Sales Order',self.booking_no)
        so_name = str(sales_order.name)
        if so_name:
            add_on_entry_child = sales_order.append('add_on_services_table',{})
            add_on_entry_child.doctype_ref = "Bar"
            add_on_entry_child.document_reference = self.name
            add_on_entry_child.date = self.date
            add_on_entry_child.amount = self.total_amount
            sales_order.save()
            frappe.msgprint("Add On Service Add Child Table")
        else:
            frappe.msgprint("Booking No Not Match Or Null")
        
            
