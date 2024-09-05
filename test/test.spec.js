import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../app.js';
import con from '../database.js';
import Bluebird from "bluebird";

chai.use(chaiHttp);
const should = chai.should();

const port = process.env.PORT || 3000;
const server = app.listen(port);

const setup = (...eventObjects) => {
  return Bluebird.mapSeries(eventObjects, (event) => {
    return chai
      .request(server)
      .post("/register")
      .send(event)
      .then((response) => {
        return response.body;
      });
  });
};

describe('Task Manager API', function () {
  let token;
  let projectId;
  let taskId;

  const userEmail = "testuser@example.com";
  const userPassword = "testpass123";

  const user = {
    email: userEmail,
    password: userPassword
  };

  // Runs before all tests to clear the database
  before(async function () {
    await new Promise((resolve, reject) => {
      con.run('DELETE FROM users', (err) => (err ? reject(err) : resolve()));
    });

    await new Promise((resolve, reject) => {
      con.run('DELETE FROM projects', (err) => (err ? reject(err) : resolve()));
    });

    await new Promise((resolve, reject) => {
      con.run('DELETE FROM tasks', (err) => (err ? reject(err) : resolve()));
    });
  });

  after(function () {
    server.close();
  });

  // Test user registration
  describe('User Authentication', function () {
    it('should register a new user', async function () {
      const res = await chai.request(app).post('/register').send(user);
      res.should.have.status(201);
      res.body.msg.should.equal('User created Successfully');
      expect(res.body).to.have.property('msg').that.is.a('string');
      expect(res.headers).to.have.property('content-type').that.contains('application/json');
    });

    it('should not register with an existing email', async function () {
      const res = await chai.request(app).post('/register').send(user);
      res.should.have.status(401);
      res.body.errMsg.should.equal('Email already exists');
      expect(res.body).to.have.property('errMsg').that.is.a('string');
    });

    it('should not register with missing email or password', async function () {
      const res = await chai.request(app).post('/register').send({ email: userEmail });
      res.should.have.status(400);
      res.body.errMsg.should.equal('email or password missing');
      expect(res.body).to.have.property('errMsg').that.is.a('string');
    });

    it('should login with correct credentials', async function () {
      const res = await chai.request(app).post('/login').send(user);
      res.should.have.status(200);
      res.body.msg.should.equal('Success');
      res.body.should.have.property('token');
      token = res.body.token;
      expect(res.body.token).to.be.a('string');
    });

    it('should not login with incorrect credentials', async function () {
      const res = await chai.request(app).post('/login').send({ email: userEmail, password: "wrongpass" });
      res.should.have.status(400);
      res.body.errMsg.should.equal('incorrect email or password');
    });

    it('should not login with missing email or password', async function () {
      const res = await chai.request(app).post('/login').send({ email: userEmail });
      res.should.have.status(400);
      res.body.errMsg.should.equal('email or password missing');
    });
  });

  // Test project management
  describe('Project Routes', function () {
    it('should create a new project', async function () {
      const res = await chai.request(app)
        .post('/create-project')
        .set('auth-token', token)
        .send({ name: 'New Project', description: 'Project Description' });
      res.should.have.status(201);
      res.body.msg.should.equal('Project Created');
      res.body.should.have.property('project_id');
      projectId = res.body.project_id;
      expect(res.body.project_id).to.be.a('number');
    });

    it('should not create a project with missing fields', async function () {
      const res = await chai.request(app)
        .post('/create-project')
        .set('auth-token', token)
        .send({ name: 'New Project' });
      res.should.have.status(400);
      res.body.errMsg.should.equal('Required Information Not Present');
    });

    it('should retrieve all projects', async function () {
      const res = await chai.request(app)
        .get('/get-all-projects')
        .set('auth-token', token);
      res.should.have.status(200);      
      res.body.should.be.a('array');
      res.body.length.should.be.above(0);
      expect(res.body[0]).to.have.property('id').that.is.a('number');
      expect(res.body[0]).to.have.property('name').that.is.a('string');
    });

    it('should retrieve a project by ID', async function () {
      const res = await chai.request(app)
        .get(`/getProjectFromId?id=${projectId}`)
        .set('auth-token', token);
      res.should.have.status(200);
      res.body.should.have.property('id').eql(projectId);
      expect(res.body).to.have.property('name').that.is.a('string');
      expect(res.body).to.have.property('description').that.is.a('string');
    });
  });

  // Test task management
  describe('Task Routes', function () {
    it('should create a new task', async function () {
      const res = await chai.request(app)
        .post('/create-task')
        .set('auth-token', token)
        .send({ name: 'New Task', description: 'Task Description', status: 'pending', project_id: projectId });
      res.should.have.status(201);
      res.body.msg.should.equal('Task Added Successfully');
      res.body.should.have.property('task_id');
      taskId = res.body.task_id;
      expect(res.body.task_id).to.be.a('number');
    });

    it('should not create a task with missing fields', async function () {
      const res = await chai.request(app)
        .post('/create-task')
        .set('auth-token', token)
        .send({ name: 'New Task' });
      res.should.have.status(400);
      res.body.errMsg.should.equal('Required Information Not Present');
    });

    it('should retrieve all tasks', async function () {
      const res = await chai.request(app)
        .get('/get-all-tasks')
        .set('auth-token', token);
      res.should.have.status(200);
      res.body.should.be.a('array');
      res.body.length.should.be.above(0);
      expect(res.body[0]).to.have.property('id').that.is.a('number');
      expect(res.body[0]).to.have.property('name').that.is.a('string');
    });

    it('should retrieve a task by ID', async function () {
      const res = await chai.request(app)
        .get(`/getTaskFromId?id=${taskId}`)
        .set('auth-token', token);
      res.should.have.status(200);
      res.body.should.have.property('id').eql(taskId);
      expect(res.body).to.have.property('name').that.is.a('string');
      expect(res.body).to.have.property('description').that.is.a('string');
    });

    it('should retrieve tasks by project ID', async function () {
      const res = await chai.request(app)
        .get(`/getTaskFromProject?project=${projectId}`)
        .set('auth-token', token);
      res.should.have.status(200);
      res.body.should.be.a('array');
      expect(res.body[0]).to.have.property('project_id').eql(projectId);
    });
  });

  // Test authentication middleware
  describe('Authentication Middleware', function () {
    it('should deny access without a token', async function () {
      const res = await chai.request(app).get('/get-all-projects');
      res.should.have.status(401);
      res.body.errMsg.should.equal('Token Missing Access denied');
    });

    it('should deny access with an invalid token', async function () {
      const res = await chai.request(app)
        .get('/get-all-projects')
        .set('auth-token', 'invalidtoken');
      res.should.have.status(401);
      res.body.errMsg.should.equal('Token Missing Access denied');
    });
  });
});
