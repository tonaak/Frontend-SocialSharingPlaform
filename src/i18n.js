import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          login: "Login",
          signup: "Sign Up",
          logout: "Logout",
          username: "Username",
          password: "Password",
          usernamePlaceHolder: "Your username",
          passwordPlaceHolder: "Your password",
          askForSignup: "Don't have an account?",
          myProfile: "My Profile",
          passwordNotMatch: "Does not match to password",
          emailNotValid: " is not a valid email address",
          email: "Email",
          emailHolder: "Your email address",
          displayName: "Display Name",
          displayNameHolder: "Your display name",
          passwordRepeat: "Password Repeat",
          passwordRepeatHolder: "Repeat your password",
          askForLogin: "Have already an account?",
          wrongPassword: "Incorrect password",
          forgotPassword: "Forgot Password",
          resetPassword: "Reset Password",
          newPassword: "New password",
          invalidPassword:
            "At least 1 uppercase, 1 lowercase, 1 number and at least 8 characters",
          emailSent:
            "We have sent a reset password link to your email. Please check",
          emailNotSent: "Error. Check your email address again",
          invalidToken: "Invalid token",
          //use list
          userLoadError: "User load failed",
          people: "People",
          next: "next >",
          previous: "< previous",
          //user page
          userNotFound: "User not found",
          //profile card
          changeDisplayNamelb: "Change Display Name for",
          edit: "Edit",
          save: "Save",
          cancel: "Cancel",
          //feed
          noPost: "There are no posts",
          oneNew: "There is 1 new post",
          thereAre: "There are",
          newPosts: "new posts",
          loadMore: "Load more",
          sure: "Are you sure to delete",
          deleteTitle: "Confirm delete!",
          delete: "Delete",
          post: "Post",
        },
      },
      vi: {
        translation: {
          login: "????ng nh???p",
          signup: "????ng k??",
          logout: "????ng xu???t",
          username: "T??n t??i kho???n",
          password: "M???t kh???u",
          usernamePlaceHolder: "T??n t??i kho???n",
          passwordPlaceHolder: "M???t kh???u",
          askForSignup: "B???n ch??a c?? t??i kho???n?",
          myProfile: "H??? s??",
          passwordNotMatch: "M???t kh???u nh???p l???i kh??ng kh???p",
          emailNotValid: " kh??ng ph???i l?? email h???p l???",
          email: "Email",
          emailHolder: "?????a ch??? email c???a b???n",
          displayName: "T??n hi???n th???",
          displayNameHolder: "T??n hi???n th??? c???a b???n",
          passwordRepeat: "Nh???p l???i m???t kh???u",
          passwordRepeatHolder: "Nh???p l???i m???t kh???u c???a b???n",
          askForLogin: "???? c?? t??i kho???n?",
          wrongPassword: "Sai m???t kh???u",
          forgotPassword: "Qu??n m???t kh???u",
          resetPassword: "?????t l???i m???t kh???u",
          newPassword: "M???t kh???u m???i",
          invalidPassword:
            "??t nh???t 1 ch??? in hoa, 1 ch??? th?????ng, 1 s??? v?? ??t nh???t 8 k?? t???",
          emailSent:
            "Ch??ng t??i s??? g???i cho b???n m???t li??n k???t ????? ?????t l???i m???t kh???u ?????n email c???a b???n, h??y ki???m tra",
          emailNotSent: "L???i. Ki???m tra l???i ?????a ch??? email c???a b???n",
          invalidToken: "Token kh??ng h???p l???",
          //use list
          userLoadError: "L???i khi t???i d??? li???u",
          people: "M???i ng?????i",
          next: "sau >",
          previous: "< tr?????c",
          //user page
          userNotFound: "T??i kho???n kh??ng t???n t???i",
          //profile card
          changeDisplayNamelb: "Thay ?????i t??n hi???n th??? cho",
          edit: "Ch???nh s???a",
          save: "L??u",
          cancel: "H???y b???",
          //feed
          noPost: "Kh??ng c?? b??i vi???t",
          oneNew: "C?? 1 b??i vi???t m???i",
          thereAre: "C??",
          newPosts: "b??i vi???t m???i",
          loadMore: "T???i th??m",
          sure: "B???n c?? mu???n x??a",
          deleteTitle: "X??c nh???n x??a!",
          delete: "X??a",
          post: "????ng",
        },
      },
    },
  });

export default i18n;
