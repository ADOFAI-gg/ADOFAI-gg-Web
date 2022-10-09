import * as Sentry from '@sentry/browser';
import { ExtraErrorData } from '@sentry/integrations';
import { Integrations } from '@sentry/tracing';

export const setupSentry = () => {
  Sentry.init({
    dsn: 'https://2ecc5abf3f814edd8a769cb770f26dde@sentry.oci.pikokr.dev/3',
    integrations: [new ExtraErrorData(), new Integrations.BrowserTracing()],
    beforeSend(event) {
      if (event.exception) {
        if (['EvalError', 'SyntaxError'].includes(event.exception.values?.[0].type as string)) {
          return null;
        }
        Sentry.showReportDialog({ eventId: event.event_id });
      }

      return event;
    }
  });
};
