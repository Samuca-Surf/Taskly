package com.samuel.Taskly.infrastructure.controller;

import com.samuel.Taskly.application.dto.ProjetoDTO;
import com.samuel.Taskly.application.service.ProjetoService;
import com.samuel.Taskly.domain.entity.Projeto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projeto")
@Tag(name = "Endpoints de CRUD do projeto")
public class ProjetoController {
    private final ProjetoService service;

    public ProjetoController(ProjetoService service) {
        this.service = service;
    }
    @Operation(summary = "listar projetos")
    @GetMapping
    public ResponseEntity<List<Projeto>> listarProjetos(){
        return ResponseEntity.ok(service.listarTodosOsProjetos());
    }
    @Operation(summary = "buscar projeto por id")
    @GetMapping("/{id}")
    public ResponseEntity<Projeto> buscarPorId(@PathVariable(value = "id") Long id){
        return ResponseEntity.ok(service.buscarPorIdDoPreojeto(id));
    }
    @Operation(summary = "endpoint para criar projeto")
    @PostMapping
    public ResponseEntity<Projeto> criarProjeto(@Valid @RequestBody ProjetoDTO dto){
        return ResponseEntity.status(HttpStatus.CREATED).body(service.criarProjeto(dto));
    }
    @Operation(summary = "endpoints para atualizar projeto passando o id")
    @PutMapping("/{id}")
    public ResponseEntity<Projeto> atualizarProjeto(@PathVariable(value = "id") Long id, @Valid @RequestBody ProjetoDTO dto){
        return ResponseEntity.ok(service.atualizarProjeto(id, dto));
    }
    @Operation(summary = "Deletar projeto por id")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarProjeto(@PathVariable(value = "id") Long id){
        service.deletarProjeto(id);
        return ResponseEntity.noContent().build();
    }
}
