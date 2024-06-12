package isi.project.RatingSystem;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class OpinionResponse {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;
    private String content;
    private Integer positiveReactions;
    private Integer negativeReactions;
    private LocalDate date;

    @OneToOne(cascade=CascadeType.REMOVE)
    private Opinion opinion;

    @ManyToOne
    private ServiceProvider serviceProvider;

    public OpinionResponse() {}

    public OpinionResponse(String content, Opinion opinion) {
        this.content = content;
        this.positiveReactions = this.negativeReactions = 0;
        date = LocalDate.now();
        this.opinion  = opinion;
        serviceProvider = opinion.getService().getServiceProvider();
    }

    public Integer getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public Integer getPositiveReactions() {
        return positiveReactions;
    }

    public Integer getNegativeReactions() {
        return negativeReactions;
    }

    public LocalDate getDate() {
        return date;
    }

    public Opinion getOpinion() {
        return opinion;
    }

    public ServiceProvider getServiceProvider() {
        return serviceProvider;
    }
}
