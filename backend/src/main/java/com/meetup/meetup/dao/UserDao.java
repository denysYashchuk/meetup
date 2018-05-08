package com.meetup.meetup.dao;

import com.meetup.meetup.entity.User;

import java.util.List;

public interface UserDao extends Dao<User> {

    User findByLogin(String login, String[] tagArray);

    User findByEmail(String email);

//    List<User> findByParams(String login, String name, String surname, Integer limit);

    User update(User model);

    boolean updatePassword(User user);

    int confirmFriend(int userId, int friendId);

    int deleteFriend(int userId, int friendId);

    List<User> getFriendsRequests(int userId);

    List<User> getFriends(int userId);

    List<User> getNotFriends(int userId, String userName);

    boolean addFriend(int senderId, int receiverId);

    boolean isLoginFree(String login);

    boolean isEmailFree(String email);

}
