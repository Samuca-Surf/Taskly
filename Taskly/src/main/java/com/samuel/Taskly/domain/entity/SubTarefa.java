package com.samuel.Taskly.domain.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "TBSUBTAREFA")
public class SubTarefa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "tarefa_id")
    private Tarefa tarefa;

    private String titulo;
    private Boolean completado = false;
    private Integer posicao;

    private LocalDateTime criado_em;
    private LocalDateTime atualizado_em;
}
