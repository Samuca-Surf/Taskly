package com.samuel.Taskly.infrastructure.repository;

import com.samuel.Taskly.domain.entity.Tarefa;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TarefaRepository extends JpaRepository<Tarefa, Long> {
}
