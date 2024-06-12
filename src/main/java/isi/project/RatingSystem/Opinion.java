package isi.project.RatingSystem;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Opinion {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;
    private Integer grade;
    private String content;
    private Integer positiveReactions;
    private Integer negativeReactions;
    private LocalDate date;

    @ManyToOne
    private User user;

    @ManyToOne
    private Service service;

    public Opinion() {}

    public Opinion(int grade, String content, User user, Service service) {
        this.grade = grade;
        this.content = content;
        this.user = user;
        this.service = service;
        date = LocalDate.now();
        this.positiveReactions = this.negativeReactions = 0;
    }

    public void addPositiveReaction() {
        positiveReactions++;
    }

    public void addNegativeReaction() {
        negativeReactions++;
    }

    public Integer getId() {
        return id;
    }

    public Integer getGrade() {
        return grade;
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

    public User getUser() {
        return user;
    }

    public Service getService() {
        return service;
    }
}
