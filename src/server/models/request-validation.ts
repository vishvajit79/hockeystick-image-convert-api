import { Request } from 'express';
import * as admin from 'firebase-admin';

export interface RequestWithBody<T> extends Request {
  /**
   * A request that uses the ValidateBodyMiddleware will have this
   * property set to a class-based object of the validated type.
   */
  validatedBody: T;
}

export interface RequestWithParams<T> extends Request {
  /**
   * A request that uses the ValidateParamsMiddleware will have this
   * property set to a class-based object of the validated type with query and
   * path params copied to it
   */
  validatedParams: T;
}

export interface RequestWithToken extends Request {
  /**
   * A request that uses the FirebaseTokenMiddleware will have this
   * property set to a class-based object of the validated type with
   * token copied to it
   */
  validatedToken: admin.auth.DecodedIdToken;
}

export interface RequestWithPhoneNumber extends Request {
  validatedPhoneNumber: string;
}
