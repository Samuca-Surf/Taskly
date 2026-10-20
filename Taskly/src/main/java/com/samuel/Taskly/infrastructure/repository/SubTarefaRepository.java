package com.samuel.Taskly.infrastructure.repository;

import com.samuel.Taskly.domain.entity.SubTarefa;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubTarefaRepository extends JpaRepository<SubTarefa, Long> {
}
