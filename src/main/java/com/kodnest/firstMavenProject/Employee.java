package com.kodnest.firstMavenProject;

public class Employee {
    private int id;
    private String name;
    private int salary;
    private int phone;
    private String email;
    private String type;

    public Employee() {
    }

    public Employee(int id, String name, int salary, int phone, String email, String type) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.phone = phone;
        this.email = email;
        this.type = type;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getSalary() {
        return salary;
    }

    public void setSalary(int salary) {
        this.salary = salary;
    }

    public int getPhone() {
        return phone;
    }

    public void setPhone(int phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}

