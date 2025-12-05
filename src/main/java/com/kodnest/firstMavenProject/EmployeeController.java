package com.kodnest.firstMavenProject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "*")
public class EmployeeController {

    @Autowired
    private EmployeeManagement employeeManagement;

    @GetMapping("/{id}")
    public ResponseEntity<?> getEmployeeById(@PathVariable int id) {
        try {
            Employee employee = employeeManagement.getEmployeeById(id);
            if (employee != null) {
                return ResponseEntity.ok(employee);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "Employee not found"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllEmployees() {
        try {
            List<Employee> employees = employeeManagement.getAllEmployees();
            return ResponseEntity.ok(employees);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping
    public ResponseEntity<?> addEmployee(@RequestBody Employee employee) {
        try {
            employeeManagement.addEmployee(
                employee.getId(),
                employee.getName(),
                employee.getSalary(),
                employee.getPhone(),
                employee.getEmail(),
                employee.getType()
            );
            return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("message", "Employee added successfully", "employee", employee));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateEmployee(
            @PathVariable int id,
            @RequestBody Map<String, Object> updates) {
        try {
            String field = (String) updates.get("field");
            Object value = updates.get("value");

            if (field == null || value == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Field and value are required"));
            }

            employeeManagement.updateEmployee(id, field, value);
            return ResponseEntity.ok(Map.of("message", "Employee updated successfully"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/bulk")
    public ResponseEntity<?> bulkDeleteEmployees(@RequestBody List<Integer> ids) {
        try {
            int deletedCount = 0;
            int failedCount = 0;
            
            for (Integer id : ids) {
                try {
                    employeeManagement.deleteEmployee(id);
                    deletedCount++;
                } catch (Exception e) {
                    failedCount++;
                }
            }
            
            return ResponseEntity.ok(Map.of(
                "message", "Bulk delete completed",
                "deleted", deletedCount,
                "failed", failedCount
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable int id) {
        try {
            employeeManagement.deleteEmployee(id);
            return ResponseEntity.ok(Map.of("message", "Employee deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", e.getMessage()));
        }
    }
}



