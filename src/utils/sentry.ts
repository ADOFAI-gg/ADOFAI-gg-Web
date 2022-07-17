import * as Sentry from '@sentry/browser';
import { CaptureConsole } from '@sentry/integrations';

export const setupSentry = () => {
  const integrations = [new CaptureConsole()];

  Sentry.init({
    dsn: 'https://2ecc5abf3f814edd8a769cb770f26dde@sentry.oci.pikokr.dev/3',
    integrations,
    beforeSend(event) {
      if (event.exception) {
        Sentry.showReportDialog({ eventId: event.event_id });
      }

      return event;
    }
  });
};
