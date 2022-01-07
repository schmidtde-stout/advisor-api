const stytchwrapper = require('./stytchwrapper');
const auth = require('./auth');
const { getMockReq, getMockRes } = require('@jest-mock/express');

jest.mock('./environment', () => {
  return {
    stytchProjectId: 'project-test-11111111-1111-1111-1111-111111111111',
    stytchSecret: 'secret-test-111111111111',
    stytchEnv: 'test',
  };
});

jest.mock('./stytchwrapper', () => {
  return {
    authenticateStytchSession: jest.fn(),
  };
});

const { res, next, clearMockRes } = getMockRes({});

describe('auth tests', () => {
  beforeEach(() => {
    clearMockRes();
    stytchwrapper.authenticateStytchSession.mockReset();
  });

  test('authorizeSession - no authorization header', async () => {
    const req = getMockReq();
    await auth.authorizeSession(req, res, next);
    expect(next).not.toBeCalled();
    expect(res.status).toBeCalledWith(401);
  });

  test('authorizeSession - no bearer token', async () => {
    const req = getMockReq({
      headers: {
        authorization: 'foo',
      },
    });
    await auth.authorizeSession(req, res, next);
    expect(next).not.toBeCalled();
    expect(res.status).toBeCalledWith(401);
  });

  test('authorizeSession - Bearer with no token', async () => {
    const req = getMockReq({
      headers: {
        authorization: 'Bearer ',
      },
    });
    await auth.authorizeSession(req, res, next);
    expect(next).not.toBeCalled();
    expect(res.status).toBeCalledWith(401);
  });

  test('authorizeSession - Bearer expired/bad token', async () => {
    const req = getMockReq({
      headers: {
        authorization: 'Bearer mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q',
      },
    });
    stytchwrapper.authenticateStytchSession.mockRejectedValue({
      status_code: 404,
      error_message: 'Session expired.',
    });
    await auth.authorizeSession(req, res, next);
    expect(next).not.toBeCalled();
    expect(stytchwrapper.authenticateStytchSession.mock.calls).toHaveLength(1);
  });

  test('authorizeSession - rejected promise - really bad error', async () => {
    const req = getMockReq({
      headers: {
        authorization: 'Bearer mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q',
      },
    });
    stytchwrapper.authenticateStytchSession.mockRejectedValue(new Error('Unknown Error'));
    await auth.authorizeSession(req, res, next);
    expect(stytchwrapper.authenticateStytchSession.mock.calls).toHaveLength(1);
    expect(next).not.toBeCalled();
    expect(res.status).toBeCalled();
  });

  test('authorizeSession - Good Bearer token', async () => {
    const req = getMockReq({
      headers: {
        authorization: 'Bearer mZAYn5aLEqKUlZ_Ad9U_fWr38GaAQ1oFAhT8ds245v7Q',
      },
    });
    stytchwrapper.authenticateStytchSession.mockResolvedValue({
      status_code: 200,
    });
    await auth.authorizeSession(req, res, next);
    expect(next).toBeCalled();
    expect(stytchwrapper.authenticateStytchSession.mock.calls).toHaveLength(1);
  });
});
