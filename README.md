ACTION MAILER FOR LOOPBACK
=============

This module is for the loopback framework. Module sends Mailgun's action emails.

INSTALL
=============

```bash
  npm i loopback-action-mailer --S
```

USAGE
=============

```js
  Member.beforeRemote('register', (ctx) => {
    actionMailer(Member, {
      redirect: `${URL}/destination`,
      from: 'example@example.com',
      to: ctx.email,
      subject: 'Hello there!',
      templateData: {
        signature: 'Elon',
        buttonText: 'Click me',
        lines: [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vitae vulputate sem.',
        ],
      },
    });
  });
```
