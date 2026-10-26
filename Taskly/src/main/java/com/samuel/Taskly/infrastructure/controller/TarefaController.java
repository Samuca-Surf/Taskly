package com.samuel.Taskly.infrastructure.controller;

import com.samuel.Taskly.application.dto.TarefaDTO;
import com.samuel.Taskly.application.service.TarefaService;
import com.samuel.Taskly.domain.entity.Tarefa;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tarefa")
@Tag(name = "Endpoints para tarefa")
public class TarefaController {
    private final TarefaService service;

    public TarefaController(TarefaService service) {
        this.service = service;
    }

    @Operation(summary = "endpoint para listar tarefas")
    @GetMapping
    public ResponseEntity<List<Tarefa>> listarTarefas(){
        return ResponseEntity.ok(service.listarTarefas());
    }
    @Operation(summary = "buscar status por id")
    @GetMapping("/{id}")
    public ResponseEntity<Tarefa> buscarTarefaPorId(@PathVariable Long id){
        return ResponseEntity.ok(service.buscarTarefaPorId(id));
    }
    @Operation(summary = "endpoint para criar tarefas")
    @PostMapping
    public ResponseEntity<Tarefa> criarTarefa(@Valid @RequestBody TarefaDTO dto){
        return ResponseEntity.status(HttpStatus.CREATED).body(service.criarTarefa(dto));
    }
    @Operation(summary = "endpoint para atualizar utilizando id")
    @PutMapping("/{id}")
    public ResponseEntity<Tarefa> atualizarTarefa(@PathVariable Long id, @Valid @RequestBody TarefaDTO dto){
        return ResponseEntity.ok(service.atualizarTarefa(id, dto));
    }
    @Operation(summary = "endpoint para deletar tarefa")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarTarefa(@PathVariable Long id){
        service.deletarTarefa(id);
        return ResponseEntity.noContent().build();
    }
}
