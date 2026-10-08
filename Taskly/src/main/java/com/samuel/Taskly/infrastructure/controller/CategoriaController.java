package com.samuel.Taskly.infrastructure.controller;

import com.samuel.Taskly.application.dto.CategoriaDTO;
import com.samuel.Taskly.application.service.CategoriaService;
import com.samuel.Taskly.domain.entity.Categoria;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categoria")
@Tag(name = "Endpoints para CRUD de categoria")
public class CategoriaController {
    private final CategoriaService service;

    public CategoriaController(CategoriaService service) {
        this.service = service;
    }

    @Operation(summary = "Listar categoria")
    @GetMapping
    public ResponseEntity<List<Categoria>> listarCategoria(){
        return ResponseEntity.status(HttpStatus.OK).body(service.listarCategoria());
    }

    @Operation(summary = "buscar id de categoria")
    @GetMapping("/{id}")
    public ResponseEntity<Categoria> buscarPorId(@PathVariable(value = "id") Long id){
        return ResponseEntity.status(HttpStatus.OK).body(service.buscarPorId(id));
    }

    @Operation(summary = "endpoint para criar categoria")
    @PostMapping
    public ResponseEntity<Categoria> criarCategoria(@Valid @RequestBody CategoriaDTO dto){
        return ResponseEntity.status(HttpStatus.CREATED).body(service.criarCategoria(dto));
    }

    @Operation(summary = "endpoint para atualizar categoria")
    @PutMapping("/{id}")
    public ResponseEntity<Categoria> atualizarCategoria(@PathVariable(value = "id") Long id, @Valid @RequestBody CategoriaDTO dto){
        return ResponseEntity.ok(service.atualizarCategoria(id, dto));
    }

    @Operation(summary = "endpoint para deletar categoria por id")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id){
        service.deletarCategoria(id);
        return ResponseEntity.noContent().build();
    }

}
