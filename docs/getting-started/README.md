# Overview


## Simplicity
Most applications require users to have accounts. That functionality has been written a tousand times before - you don't want to write it again for your application.


Loginservice allows you to add login functionality in a few steps:

1. Define your application in your Tooltwist dashboard.
1. Add initialization code to your app.
1. Add the login component to your app.

Your application will have industry standard JWT (JSON Web Token) support, meaning that your application front end
and backend - if you have one - will know with certainty who is logged in and what they are allowed to do.



## Architecture

--IMAGE--


## JWTs
JWT is an anacronym for **Jason Web Token**, a standard for passing user credentials around web-based applications.
<!--YARP find a description somewhere -->


## Swapping Out Loginservice
`Loginservice` is not mandatory for an application using Tooltwist services.

Many teams start a project using Loginservice because it is so easy to get started, but with the intention of switching over to a "big brand" authentication solution later. That is fine with us. One advantage of JWTs is that they are an industry standard supported by many vendors, and such a switch over is relatively easy.

So feel free to start your project with loginservice knowing that you can swap it out later, whever you decide the invest the effort that the more complicated solutions require. Or, if you are like 99% of Loginservice users, you might find that it supports your needs, and the costs of the other authentication vendor are not warranted.

<!--YARP Need to check this thoroughly -->
Note that the other Tooltwist components - contentservice, formservice, crowdhound, etc - do not care whether you use Loginservice or not. They will happily use the JWTs in your application no matter where they come form.

If you are interested in exploring the alternatives, the following vendors are well known:

- Auth0
- Cognito

<!--YARP others?-->
