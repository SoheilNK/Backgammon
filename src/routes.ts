//routes.ts is the file where we define all our routes for our application.
import { checkRole } from "./middlewares/checkRole";
import { UserController } from "./controllers/UserController";
import { GameController } from "./controllers/GameController";
import { checkJwtCognito } from "./middlewares/checkJwtCognito";
import { AuthController } from "./controllers/AuthController";

export const Routes = [
  // Update user profile
  {
    method: "put",
    route: "/api/user/update-profile",
    controller: UserController,
    middlewares: [checkJwtCognito],
    action: "updateProfile",
  },
  // Change user password
  {
    method: "post",
    route: "/api/user/change-password",
    controller: UserController,
    middlewares: [checkJwtCognito],
    action: "changePassword",
  },
  // Delete user profile
  {
    method: "delete",
    route: "/api/user/delete-profile",
    controller: UserController,
    middlewares: [checkJwtCognito],
    action: "deleteProfile",
  },
  //refresh token
  {
    method: "post",
    route: "/api/auth/refresh",
    controller: AuthController,
    action: "refreshTokens",
  },
  {
    //Get all users--
    method: "get",
    route: "/api/user",
    middlewares: [checkJwtCognito],
    controller: UserController,
    action: "getUser",
  },
  {
    //Get all online games
    method: "get",
    route: "/api/games",
    controller: GameController,
    middlewares: [checkJwtCognito],
    action: "getOnlineGames",
  },
  {
    //Add a new online game
    method: "post",
    route: "/api/games/add",
    controller: GameController,
    middlewares: [checkJwtCognito],
    action: "addOnlineGame",
  },
  {
    //Join an online game
    method: "post",
    route: "/api/games/join",
    controller: GameController,
    middlewares: [checkJwtCognito],
    action: "joinOnlineGame",
  },
  {
    //Update an online game
    method: "post",
    route: "/api/games/update",
    controller: GameController,
    middlewares: [checkJwtCognito],
    action: "updateOnlineGame",
  },
  {
    //leave an online game
    method: "post",
    route: "/api/games/leave",
    controller: GameController,
    middlewares: [checkJwtCognito],
    action: "leaveOnlineGame",
  },
];
