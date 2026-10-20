package com.samuel.Taskly.infrastructure.controller;

import com.samuel.Taskly.application.dto.StatusDTO;
import com.samuel.Taskly.application.service.StatusService;
import com.samuel.Taskly.domain.entity.Status;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/status")
@Tag(name = "Endpoints para status")
public class StatusController {
    private final StatusService service;
    public StatusController(StatusService service) {
        this.service = service;
    }
    @GetMapping
    public ResponseEntity<List<Status>> listarStatus(){
        return ResponseEntity.ok(service.listarStatus());
    }
    @GetMapping("/{id}")
    public ResponseEntity<Status> buscarPorIdDoStatus(@PathVariable Long id){
        return ResponseEntity.ok(service.buscarPorIdDoStatus(id));
    }
    @PostMapping
    public ResponseEntity<Status> criarStatus(@Valid @RequestBody StatusDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.criarStatus(dto));
    }
    @PutMapping("/{id}")
    public ResponseEntity<Status> atualizarStatus(@PathVariable Long id, @Valid @RequestBody StatusDTO dto){
        return ResponseEntity.ok(service.atualizarStatus(id, dto));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarStatus(@PathVariable Long id){
        service.deletarStatus(id);
        return ResponseEntity.noContent().build();
    }
}