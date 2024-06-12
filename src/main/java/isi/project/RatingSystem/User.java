package isi.project.RatingSystem;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;
    private String nickname;
    private String password;
    private String email;
    boolean isServiceProvider;

    @OneToMany
    private List<Opinion> userOpinions;

    public User() {

    }

    public User(String nickname, String password, String email) {
        this.nickname = nickname;
        this.password = password;
        this.email = email;
    }

    public String getNickname() {
        return nickname;
    }

    public String getEmail() {
        return email;
    }

    public Integer getId() {
        return id;
    }

    public void setIsServiceProvider(boolean value) {
        this.isServiceProvider = value;
    }

    public String getPassword() {
        return password;
    }

    private String token;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
