import UserModel from './user.model';
import { User } from './user.interface';
import { ConflictException, NotFoundException, ServerException } from '@/utils/exceptions';

class UserService {
  /**
   * Create a new user
   */
  public async create(userData: Omit<User, '_id'>): Promise<User> {
    try {
      const user = await UserModel.create(userData);
      return user;
    } catch (error: any) {
      if (error.code === 11000) {
        throw new ConflictException('User with this email');
      }
      throw new ServerException('Unable to create user');
    }
  }

  /**
   * Find all users
   */
  public async findAll(): Promise<User[]> {
    try {
      const users = await UserModel.find().select('-password');
      return users;
    } catch (error) {
      throw new ServerException('Unable to find users');
    }
  }

  /**
   * Find user by ID
   */
  public async findById(id: string): Promise<User> {
    try {
      const user = await UserModel.findById(id).select('-password');

      if (!user) {
        throw new NotFoundException('User');
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new ServerException('Unable to find user');
    }
  }

  /**
   * Update user
   */
  public async update(id: string, userData: Partial<User>): Promise<User> {
    try {
      const user = await UserModel.findByIdAndUpdate(id, userData, { new: true }).select('-password');

      if (!user) {
        throw new NotFoundException('User');
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new ServerException('Unable to update user');
    }
  }

  /**
   * Delete user
   */
  public async delete(id: string): Promise<void> {
    try {
      const result = await UserModel.findByIdAndDelete(id);

      if (!result) {
        throw new NotFoundException('User');
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new ServerException('Unable to delete user');
    }
  }
}

export default UserService;
