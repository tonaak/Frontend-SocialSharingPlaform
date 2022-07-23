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
          login: "Đăng nhập",
          signup: "Đăng ký",
          logout: "Đăng xuất",
          username: "Tên tài khoản",
          password: "Mật khẩu",
          usernamePlaceHolder: "Tên tài khoản",
          passwordPlaceHolder: "Mật khẩu",
          askForSignup: "Bạn chưa có tài khoản?",
          myProfile: "Hồ sơ",
          passwordNotMatch: "Mật khẩu nhập lại không khớp",
          emailNotValid: " không phải là email hợp lệ",
          email: "Email",
          emailHolder: "Địa chỉ email của bạn",
          displayName: "Tên hiển thị",
          displayNameHolder: "Tên hiển thị của bạn",
          passwordRepeat: "Nhập lại mật khẩu",
          passwordRepeatHolder: "Nhập lại mật khẩu của bạn",
          askForLogin: "Đã có tài khoản?",
          wrongPassword: "Sai mật khẩu",
          //use list
          userLoadError: "Lỗi khi tải dữ liệu",
          people: "Mọi người",
          next: "sau >",
          previous: "< trước",
          //user page
          userNotFound: "Tài khoản không tồn tại",
          //profile card
          changeDisplayNamelb: "Thay đổi tên hiển thị cho",
          edit: "Chỉnh sửa",
          save: "Lưu",
          cancel: "Hủy bỏ",
          //feed
          noPost: "Không có bài viết",
          oneNew: "Có 1 bài viết mới",
          thereAre: "Có",
          newPosts: "bài viết mới",
          loadMore: "Tải thêm",
          sure: "Bạn có muốn xóa",
          deleteTitle: "Xác nhận xóa!",
          delete: "Xóa",
          post: "Đăng",
        },
      },
    },
  });

export default i18n;
