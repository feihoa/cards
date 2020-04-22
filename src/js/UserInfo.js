

export class UserInfo {

    setUserInfo(name, about) {

        this.name = name;
        this.about = about;

    }

    setUserInfoAvatar(avatar) {
        this.avatar = avatar;

    }
    updateUserInfo() {
        return {
            name: this.name,
            about: this.about,
        }
    }
    updateUserInfoAvatar() {
        return {
            avatar: this.avatar,
        }
    }


}
