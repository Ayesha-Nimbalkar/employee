package com.kodnest.firstMavenProject;
import java.sql.*;
import java.util.*;

import org.springframework.stereotype.Service;

@Service
public class EmployeeManagement {

Connection con=null;

String dPath = "com.mysql.cj.jdbc.Driver";

String url = "jdbc:mysql://localhost:3306/kodnest";

String user = "root";

String password = "ayesha";



public EmployeeManagement() {

try {

Class.forName(dPath);

con=DriverManager.getConnection(url,user,password);



}

catch (Exception e) {

e.printStackTrace();

}

}



Employee getEmployeeById(int id) {

PreparedStatement ps=null;

ResultSet rs = null;

try {

String sql = "select * from employee where id=?";

ps=con.prepareStatement(sql);

ps.setInt(1, id);

rs=ps.executeQuery();

if(rs.next()) {

return new Employee(
    rs.getInt(1),
    rs.getString(2),
    rs.getInt(3),
    rs.getInt(4),
    rs.getString(5),
    rs.getString(6)
);

}

return null;

}

catch (Exception e) {

e.printStackTrace();

return null;

}

finally {

try {

if(ps != null) ps.close();

if(rs != null) rs.close();

}

catch (Exception e) {

e.printStackTrace();

}

}

}



List<Employee> getAllEmployees()

{

List<Employee> employees = new ArrayList<>();

PreparedStatement ps=null;

ResultSet rs = null;

try {

String sql = "select * from employee";

ps=con.prepareStatement(sql);

rs=ps.executeQuery();

while(rs.next()) {

employees.add(new Employee(
    rs.getInt(1),
    rs.getString(2),
    rs.getInt(3),
    rs.getInt(4),
    rs.getString(5),
    rs.getString(6)
));

}

}

catch (Exception e) {

e.printStackTrace();

}

finally {

try {

if(ps != null) ps.close();

if(rs != null) rs.close();

}

catch (Exception e) {

e.printStackTrace();

}

}

return employees;

}



void addEmployee(int id, String name, int salary, int phone, String email, String type) {

    PreparedStatement ps = null;

    try {
        String sql = "INSERT INTO employee VALUES (?, ?, ?, ?, ?, ?)";
        ps = con.prepareStatement(sql);

        ps.setInt(1, id);
        ps.setString(2, name);
        ps.setInt(3, salary);
        ps.setInt(4, phone);
        ps.setString(5, email);
        ps.setString(6, type);

        ps.executeUpdate();
    }
    catch (Exception e) {
        e.printStackTrace();
    }
    finally {
        try {
            if (ps != null) ps.close();
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }
}




void updateEmployee(int id, String field, Object value) {

    PreparedStatement ps = null;

    try {

        String sql = "";

        switch (field.toLowerCase()) {

            case "name":
                sql = "UPDATE employee SET name=? WHERE id=?";
                ps = con.prepareStatement(sql);
                ps.setString(1, (String) value);
                ps.setInt(2, id);
                break;

            case "phone":
                sql = "UPDATE employee SET phone=? WHERE id=?";
                ps = con.prepareStatement(sql);
                ps.setInt(1, Integer.parseInt(value.toString()));
                ps.setInt(2, id);
                break;

            case "email":
                sql = "UPDATE employee SET email=? WHERE id=?";
                ps = con.prepareStatement(sql);
                ps.setString(1, (String) value);
                ps.setInt(2, id);
                break;

            case "salary":
                sql = "UPDATE employee SET salary=? WHERE id=?";
                ps = con.prepareStatement(sql);
                ps.setInt(1, Integer.parseInt(value.toString()));
                ps.setInt(2, id);
                break;

            case "type":
                sql = "UPDATE employee SET type=? WHERE id=?";
                ps = con.prepareStatement(sql);
                ps.setString(1, (String) value);
                ps.setInt(2, id);
                break;

            default:
                throw new IllegalArgumentException("Invalid field: " + field);
        }

        ps.executeUpdate();
    }
    catch (Exception e) {
        e.printStackTrace();
        throw new RuntimeException("Error updating employee", e);
    }
    finally {
        try {
            if (ps != null) ps.close();
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }
}




void deleteEmployee(int id) {

    PreparedStatement ps = null;

    try {
        String sql = "DELETE FROM employee WHERE id=?";
        ps = con.prepareStatement(sql);

        ps.setInt(1, id);

        ps.executeUpdate();
    }
    catch (Exception e) {
        e.printStackTrace();
    }
    finally {
        try {
            if (ps != null) ps.close();
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }
}


}
