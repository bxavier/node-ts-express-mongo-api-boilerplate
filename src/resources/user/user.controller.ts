import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import UserService from './user.service';
import validate from '@/middlewares/validation.middleware';
import userValidation from './user.validation';

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateUserRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: string
 *
 *     UpdateUserRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: string
 *
 * tags:
 *   name: Users
 *   description: User management
 */
class UserController implements Controller {
  public path = '/users';
  public router: Router;
  private userService: UserService;

  constructor() {
    this.router = Router();
    this.userService = new UserService();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(this.path, this.getUsers);
    this.router.get(`${this.path}/:id`, validate(userValidation.getUser), this.getUser);
    this.router.post(this.path, validate(userValidation.createUser), this.createUser);
    this.router.put(`${this.path}/:id`, validate(userValidation.updateUser), this.updateUser);
    this.router.delete(`${this.path}/:id`, validate(userValidation.deleteUser), this.deleteUser);
  }

  /**
   * @openapi
   * /users:
   *   get:
   *     summary: Get all users
   *     tags: [Users]
   *     responses:
   *       200:
   *         description: Success
   */
  private getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const users = await this.userService.findAll();
      res.status(200).json({ data: users });
    } catch (error) {
      next(error);
    }
  };

  /**
   * @openapi
   * /users/{id}:
   *   get:
   *     summary: Get user by ID
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Success
   *       404:
   *         description: Not found
   */
  private getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const user = await this.userService.findById(id);
      res.status(200).json({ data: user });
    } catch (error) {
      next(error);
    }
  };

  /**
   * @openapi
   * /users:
   *   post:
   *     summary: Create user
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateUserRequest'
   *     responses:
   *       201:
   *         description: Created
   *       400:
   *         description: Bad request
   */
  private createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData = req.body;
      const user = await this.userService.create(userData);
      res.status(201).json({ data: user });
    } catch (error) {
      next(error);
    }
  };

  /**
   * @openapi
   * /users/{id}:
   *   put:
   *     summary: Update user
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateUserRequest'
   *     responses:
   *       200:
   *         description: Success
   *       404:
   *         description: Not found
   */
  private updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const userData = req.body;
      const user = await this.userService.update(id, userData);
      res.status(200).json({ data: user });
    } catch (error) {
      next(error);
    }
  };

  /**
   * @openapi
   * /users/{id}:
   *   delete:
   *     summary: Delete user
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       204:
   *         description: No content
   *       404:
   *         description: Not found
   */
  private deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      await this.userService.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
