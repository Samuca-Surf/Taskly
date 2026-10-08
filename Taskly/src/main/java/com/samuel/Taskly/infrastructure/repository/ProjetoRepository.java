package com.samuel.Taskly.infrastructure.repository;

import com.samuel.Taskly.domain.entity.Projeto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProjetoRepository extends JpaRepository<Projeto, Long> {
    Optional<Projeto> findByNomeContainingIgnoreCase(String nome);

}
