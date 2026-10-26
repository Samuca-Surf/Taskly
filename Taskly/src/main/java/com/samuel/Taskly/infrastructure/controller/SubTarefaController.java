package com.samuel.Taskly.infrastructure.controller;

import com.samuel.Taskly.application.dto.SubTarefaDTO;
import com.samuel.Taskly.application.service.SubTarefaService;
import com.samuel.Taskly.domain.entity.SubTarefa;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subtarefa")
@Tag(name = "Endpoints de CRUD de subtarefas")
public class SubTarefaController {
    private final SubTarefaService service;

    public SubTarefaController(SubTarefaService service) {
        this.service = service;
    }
    @Operation(summary = "Listar subtarefas")
    @GetMapping("listar/{idTarefa}")
    public ResponseEntity<List<SubTarefa>> listarSubtarefas(@PathVariable Long idTarefa) {
        return ResponseEntity.ok(service.listarSubtarefas(idTarefa));
    }
    @Operation(summary = "buscar sub-tarefas por id")
    @GetMapping("/{id}")
    public ResponseEntity<SubTarefa> buscarPorId(@PathVariable(value = "id") Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }
    @Operation(summary = "endpoint para criar sub-tarefas")
    @PostMapping
    public ResponseEntity<SubTarefa> criarSubTarefa(@Valid @RequestBody SubTarefaDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.criarSubTarefa(dto));
    }
    @Operation(summary = "endpoint para atualizar sub-tarefa por id")
    @PutMapping("/{id}")
    public ResponseEntity<SubTarefa> atualizarSubTarefa(@PathVariable(value = "id")Long id, @Valid @RequestBody SubTarefaDTO dto) {
        return ResponseEntity.ok(service.atualizarSubTarefa(id, dto));
    }
    @Operation(summary = "deletar sub-tarefa por id")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarSubTarefa(@PathVariable(value = "id") Long id) {
        service.deletarSubTarefa(id);
        return ResponseEntity.noContent().build();
    }
}
