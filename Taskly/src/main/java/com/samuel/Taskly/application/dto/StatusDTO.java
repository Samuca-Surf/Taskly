package com.samuel.Taskly.application.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

//BACKLOG, INPROGRESS, etc
public record StatusDTO(
    @NotEmpty(message = "O titulo do status nao pode ser nula")
    String nome,
    @Min(0)
    Integer posicao,
    @NotEmpty(message = "Coloque o hexadecimal da cor do status")
    String hexCor,
    @NotNull(message = "Coloque o id do projeto aqui")
    Long id_projeto
){

}
