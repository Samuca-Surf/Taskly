package com.samuel.Taskly.infrastructure.repository;

import com.samuel.Taskly.domain.entity.SubTarefa;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubTarefaRepository extends JpaRepository<SubTarefa, Long> {
    List<SubTarefa> findByTarefaId(Long tarefaId);

    // Da mais antiga para a mais recente (Cronológica)
    List<SubTarefa> findByTarefaIdOrderByCriadoEmAsc(Long tarefaId);

    // Da mais recente para a mais antiga (Inversa)
    List<SubTarefa> findByTarefaIdOrderByCriadoEmDesc(Long tarefaId);
}
