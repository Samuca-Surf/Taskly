package com.samuel.Taskly.infrastructure.repository;

import com.samuel.Taskly.domain.entity.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    Optional<Categoria> findByNomeContainingIgnoreCase(String nome);
}
