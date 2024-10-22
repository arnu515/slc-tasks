# Part 1

## UX Issues on the [clubs](https://clubs.iiit.ac.in) and [life](https://life.iiit.ac.in) websites

**Life:**

- The website when opened starts with a big loading spinner. Use skeleton instead. Server rendered. The user's theme is not respected on the spinner.
- Images take lots of time to load, so they should be preloaded earlier. This is done only for gallery images, but not other images such as the ones on the SLC events page.
- Calendar page takes lots of time to load for the first time.
  - Some calendar text is not readable (insufficient contrast)
- The website takes a lot of time to load for the first time.

**Clubs:**

- Same loading spinner.

- Images are loaded when the client scrolls them into view. Instead, they should be loaded when the page is loaded. On slow connections, this is very noticeable.

- Images are stretched in the club's page:

![image](https://github.com/user-attachments/assets/9d19ba18-2bb1-4bcf-9a68-ec4ba9d74e65)

- There is a loading spinner on every page. Links should be prefetched on hover.

- Adding a service worker to cache webpages which don't change could help a lot with increasing the speed of the website.

## Clubs Council Codebase structure

There is an NGINX server that routes all requests to the respective microservices based on the path of the URL. There appears to be a few private repositories which hold code for the `auth` and `files` microservices. Any request starting with `/files` is sent to the file server, and any request to `/login`, `/logout`, and `logoutCallback` are sent to the auth server. Any request to `/graphql` is passed to the apollo graphql gateway, which is an express/apollo server. It forwards the graphql requests to the respective microservices. The backend is divided into these microservices:

- authentication
- files
- clubs
- members
- events
- users - to get user profile from LDAP, and user metadata from local db
- interfaces - for accessing third party apis

## Courier Service notification

When a new courier arrives, the guard will add it to the portal, and it'll send an email to the student, and also appear in the portal. A few issues - if the courier is not addressed to a person, but say their room number, or a pseudonym, then it is not possible to send the notification.

## New feature for the courier portal

Allowing other students to collect on a student's behalf. The student can issue a ticket in the portal saying that another student with these details will pick up their courier for them. This can be done by adding a form to the portal page which allows a student to enter another student's details. It'll generate an OTP code for the student which they can share with the guard and collect the package. The other student can also revoke this OTP if they change their mind.
