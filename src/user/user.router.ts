import express from 'express';
import * as user from './user';
import logger from '../log';
import userService from './user.service';
import publicDir from '../constant';

const router = express.Router();

router.get('/', (req: any, res, next) => {
  let u = { ...req.session.user };
  logger.debug(u);
  if (u.username) {
    res.send(JSON.stringify(u));
  } else {
    res.sendStatus(401);
  }
});

router.get('/login', function (req: any, res, next) {
  if (req.session.user) {
    console.log(req.session.user);
    res.redirect('/');
  }
  res.send('<h1> Not logged in </h1>');
});

router.post('/', function (req: any, res) {
  logger.debug(req.body);
  user.login(req.body.username, req.body.password).then((result) => {
    if (result === null) {
      res.sendStatus(401);
    } else {
      req.session.user = result;
      res.send(JSON.stringify(result));
    }
  });
});

router.put('/', (req: any, res, next) => {
  logger.debug(req.body);
  userService.updateUser(req.body).then((result) => {
    if (result) {
      res.status(204).send('User updated');
    } else {
      res.status(400).send('Failed to update user');
    }
  });
});

router.delete('/:username', function (req: any, res: any) {
  const username = req.params.username;
  if (req.session && req.session.user && req.session.user.role === 'employee') {
    userService
      .deleteUser(username)
      .then((data) => {
        logger.debug(username, ' : delete a user');
        res.send(JSON.stringify(data));
      })
      .catch((err) => res.send(JSON.stringify(err)));
  } else if (
    req.session &&
    req.session.user &&
    req.session.user.role === 'admin'
  ) {
    userService
      .deleteUser(username)
      .then((data) => {
        logger.debug(username, ' : delete an employee');
        res.send(JSON.stringify(data));
      })
      .catch((err) => res.send(JSON.stringify(err)));
  } else {
    res.status(401).send('You are not authorized to delete users');
  }
});

router.delete('/', (req, res, next) => {
  req.session.destroy((err) => logger.error(err));
  res.sendStatus(204);
});

router.post('/register', function (req: any, res: any) {
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    user
      .register(username, password)
      .then((data) => res.status(200).send(JSON.stringify(data)))
      .catch((err) => res.status(400).send(JSON.stringify(err)));
  } else {
    res.sendFile('error.html', { root: publicDir });
  }
});

router.post('/eregister', function (req: any, res: any) {
  let loggedUser = req.session.user;
  if (loggedUser && loggedUser.role === 'adm') {
    const username = req.body.username;
    const password = req.body.password;
    if (username) {
      user
        .eregister(username, password)
        .then((data: any) => res.status(200).send(JSON.stringify(data)))
        .catch((err: any) => res.status(400).send(JSON.stringify(err)));
    } else {
      res.sendFile('error.html', { root: publicDir });
    }
  } else {
    res.send('you are not authorized');
  }
});

function addEmployee(req: any, res: any, next: Function) {
  let u: any = req.session.user;

  if (u && u.role === 'admin') {
    return next;
  }
}

router.post('/login', function (req: any, res: any) {
  const username = req.body.username;
  const password = req.body.password;
  user
    .login(username, password)
    .then((newUser) => {
      req.session.user = newUser;
      res.send(JSON.stringify(newUser));
    })
    .catch((err) => res.send(JSON.stringify(err)));
});

router.get('/logout', (req, res, next) => {
  req.session.destroy((err) => logger.error(err));
  res.redirect('/');
});

export default router;
