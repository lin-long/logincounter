"""
Each file that starts with test... in this directory is scanned for subclasses of unittest.TestCase or testLib.RestTestCase
"""

import unittest
import os
import testLib
        
class TestAdd(testLib.RestTestCase):
    """Test adding users"""
    def assertResponse(self, respData, count = 1, errCode = testLib.RestTestCase.SUCCESS):
        """
        Check that the response data dictionary matches the expected values
        """
        expected = { 'errCode' : errCode }
        if count is not None:
            expected['count']  = count
        self.assertDictEqual(expected, respData)

    #adding tests
    def testAddingExistingUser(self):
        self.makeRequest("/users/add", method="POST", data = { 'user' : 'TestUser', 'password' : 'password'} )
        respData = self.makeRequest("/users/add", method="POST", data = { 'user' : 'TestUser', 'password' : 'password'} )
        #print('HERES THE DATA!!!!!!', respData)
        self.assertDictEqual(respData, {'errCode' : -2})

    def testAddEmptyUsername(self):
        respData = self.makeRequest("/users/add", method="POST", data = { 'user' : '', 'password' : 'password'} )
        self.assertDictEqual(respData, {'errCode' : -3})

    def testAddEmptyPassword(self):
        respData = self.makeRequest("/users/add", method="POST", data = { 'user' : 'user2', 'password' : ''} )
        self.assertResponse(respData, count = 1)

    def testAddInvalidUsername(self):
        respData = self.makeRequest("/users/add", method="POST", data = { 'user' : 'This is a test username that is longer than 128 characters.' 
                        + 'This is a test username that is longer than 128 characters.' 
                        + 'This is a test username that is longer than 128 characters.', 'password' : 'password'} )
        self.assertDictEqual(respData, {'errCode' : -3})

    def testAddInvalidPassword(self):
        respData = self.makeRequest("/users/add", method="POST", data = { 'user' : 'user3', 'password' : 
                                     'This is a test password that is longer than 128 characters.' 
                                    + 'This is a test username that is longer than 128 characters.' 
                                    + 'This is a test username that is longer than 128 characters.'} )
        self.assertDictEqual(respData, {'errCode' : -4})

class TestLogin(testLib.RestTestCase):
    """Test user login"""
    def assertResponse(self, respData, count = 1, errCode = testLib.RestTestCase.SUCCESS):
        """
        Check that the response data dictionary matches the expected values
        """
        expected = { 'errCode' : errCode }
        if count is not None:
            expected['count']  = count
        self.assertDictEqual(expected, respData)

    def testLoginExistingUser(self):
        self.makeRequest("/users/add", method="POST", data = { 'user' : 'user1', 'password' : 'password'} )
        respData = self.makeRequest("/users/login", method="POST", data = { 'user' : 'user1', 'password' : 'password'} )
        self.assertDictEqual(respData, {'errCode' : 1, 'count' : respData['count']})

    def testLoginInvalidUserName(self):
        respData = self.makeRequest("/users/login", method="POST", data = { 'user' : 'InvalidUserName', 'password' : 'password'} )
        self.assertDictEqual(respData, {'errCode' : -1})

    def testLoginInvalidPassword(self):
        self.makeRequest("/users/add", method="POST", data = { 'user' : 'user4', 'password' : 'password'} )
        respData = self.makeRequest("/users/login", method="POST", data = { 'user' : 'user4', 'password' : 'InvalidPassword'} )
        self.assertDictEqual(respData, {'errCode' : -1})
