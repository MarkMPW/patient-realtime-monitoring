# Agnos Patient realtime monitoring

This project is a responsive web-based form designed for patients to submit their personal information. The submitted data is displayed in real-time to staff members through a dedicated interface. Staff can also monitor the activity status of each patient—whether they are active or inactive. The user interface is fully responsive and optimized for use across all device screen sizes.

## To run project
```bash
git clone https://github.com/MarkMPW/patient-realtime-monitoring.git

npm install

npm run dev

```
## Tech Stacks
* React 19
* Next.js 15
* TailwindCss
* TypeScript
* Ably
* Zod

## Features
- **Real-time Data Sync**: Staff can instantly view patient data while typing without needing to refresh the page.
  
- **Activity Status Tracking**: Visual indicators show whether a patient is currently active or inactive or already sunmited the form.
  
- **Resposive Design**: Fully optimized for all screen sizes from mobile phones to desktop displays.
  
- **Validation and Type Safety**: Built-in form validation and schema enforcement using Zod and TypeScript.

## Setup Ably API Key
Before connect to Ably you need to create Api key first [Learn more](https://ably.com/docs/auth)
```
ABLY_API_KEY=
```
