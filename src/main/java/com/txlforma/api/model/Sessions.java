package com.txlforma.api.model;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Sessions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idSessions;
}