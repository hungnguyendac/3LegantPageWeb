$(() => {
  // Click to view password
  $(".toggle_password").on("click", () => {
    const $input = $(".password_input");
    const isPassword = $input.attr("type") === "password";
    $input.attr("type", isPassword ? "text" : "password");
  });
})