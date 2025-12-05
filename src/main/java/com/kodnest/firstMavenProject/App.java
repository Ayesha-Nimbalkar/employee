package com.kodnest.firstMavenProject;
import java.util.*;

public class App {
  public static void main(String[] args) {
	  

	  Scanner scan = new Scanner(System.in);

	  try {
	  EmployeeManagement employeeManagement = new EmployeeManagement();

	  while(true) {

	  System.out.println("CHOOSE THE OPERATION");

	  System.out.println("1->getEmployeeById");

	  System.out.println("2->getAllEmployees");

	  System.out.println("3->addEmployee");

	  System.out.println("4->updateEmployee");

	  System.out.println("5->deleteEmployee");

	  System.out.println("other -> Exit");

	  int ch = scan.nextInt();

	  switch (ch) {

	  case 1 : {

	  System.out.println("Enter the id");

	  int id=scan.nextInt();

	  Employee emp = employeeManagement.getEmployeeById(id);
	  if(emp != null) {
	      System.out.println(emp.getId()+" "+emp.getName()+" "+emp.getSalary()+" "+emp.getPhone()+" "+emp.getEmail()+" "+emp.getType());
	  } else {
	      System.out.println("Employee not found!");
	  }

	  break;

	  }



	  case 2 : {

	  List<Employee> employees = employeeManagement.getAllEmployees();
	  for(Employee emp : employees) {
	      System.out.println(emp.getId()+" "+emp.getName()+" "+emp.getSalary()+" "+emp.getPhone()+" "+emp.getEmail()+" "+emp.getType());
	  }
	  if(employees.isEmpty()) {
	      System.out.println("No employees found!");
	  }

	  break;

	  }



	  case 3 : {

	  System.out.println("Enter id,name,salary,phone,email,type");

	  int id = scan.nextInt();

	  String name=scan.next();

	  int salary=scan.nextInt();

	  int phone = scan.nextInt();

	  String email=scan.next();

	  String type = scan.next();

	  employeeManagement.addEmployee(id, name, salary, phone, email, type);
	  break;
	  }



	  case 4 : {

	  System.out.println("Enter Employee Id");
	  int id = scan.nextInt();
	  
	  System.out.println("Choose field to update:");
	  System.out.println("1 -> Update Name");
	  System.out.println("2 -> Update Phone");
	  System.out.println("3 -> Update Email");
	  
	  int choice = scan.nextInt();
	  String field = "";
	  Object value = null;
	  
	  switch(choice) {
	      case 1:
	          field = "name";
	          System.out.println("Enter new name:");
	          value = scan.next();
	          break;
	      case 2:
	          field = "phone";
	          System.out.println("Enter new phone:");
	          value = scan.nextInt();
	          break;
	      case 3:
	          field = "email";
	          System.out.println("Enter new email:");
	          value = scan.next();
	          break;
	      default:
	          System.out.println("Invalid choice!");
	          break;
	  }
	  
	  if(!field.isEmpty()) {
	      employeeManagement.updateEmployee(id, field, value);
	      System.out.println("Employee Updated Successfully!");
	  }

	  break;

	  }



	  case 5: {

	  System.out.println("Enter Employee Id");

	  int id = scan.nextInt();

	  employeeManagement.deleteEmployee(id);

	  break;

	  }

	  default : {

	  System.out.println("THANK YOU FOR USING EMS");

	  return;

	  }

	  }

	  }

	  } finally {
	      scan.close();
	  }

	  
  }

}
