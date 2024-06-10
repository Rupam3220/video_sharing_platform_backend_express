# Error checking guide for developers

<!-- Controller Errors -->

<!-- userRegister -->
1. "All fields are required!" = check userController.js, Line - 21
2. "Username or Email already exists, Please try with another username or email..." => check userController.js, Line - 31
3. "Avatar should not empty!" => check userController.js, Line - 40
4. "Avatar file is required!" => check userController.js, Line - 49
5. "Error while registering the user" => check userController.js, Line - 69

<!-- userLogin -->


