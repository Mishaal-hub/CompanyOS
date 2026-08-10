package com.companyos.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "company")
@Data
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long companyId;

    private String companyName;

    private String email;

    private String phone;

    private String address;

    private String website;

    private String industry;

    private String logoUrl;
}