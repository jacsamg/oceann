import { expect } from 'chai';
import {
  setTimezone,
  getTimezone,
  getDateTime,
  getDate,
  getLocalTimezone,
  getTimezoneFromDate,
  isValidIsoDateWithTimezone,
  extractOffsetFromISO,
  convertOffsetToTimezone,
  timestampIsSec,
  timestampIsMs
} from '../../src/date';
import { JUAREZ_TIMEZONE, DENVER_TIMEZONE } from '../../src/date';
import { timezonePattern, timezonePatternWithSeparator } from '../utils/data';

describe('date', () => {
  describe('setTimezone', () => {
    it('should set custom timezone', () => {
      setTimezone(JUAREZ_TIMEZONE);
      expect(getTimezone().name).to.equal(JUAREZ_TIMEZONE);
    });

    it('should set fallback timezone', () => {
      setTimezone('zone/invalid', DENVER_TIMEZONE);
      expect(getTimezone().name).to.equal(DENVER_TIMEZONE);
    });
  });

  describe('getTimezone', () => {
    it('should return the default timezone', () => {
      setTimezone(JUAREZ_TIMEZONE);
      expect(getTimezone().name).to.equal(JUAREZ_TIMEZONE);
    });
  });

  describe('getDateTime', () => {
    it('should return the DateTime instance', () => {
      const DateTime = getDateTime();
      const date = DateTime.now().day;
      const nowDay = new Date().getDate();

      expect(date).to.be.a('number');
      expect(date).to.equal(nowDay);
    });
  });

  describe('getDate', () => {
    it('should return a DateTime object with the specified timezone', () => {
      setTimezone(JUAREZ_TIMEZONE);
      expect(getDate().zoneName).to.equal(JUAREZ_TIMEZONE);
    });
  });

  describe('getLocalTimezone', () => {
    it('should return the local timezone', () => {
      expect(getLocalTimezone()).to.match(timezonePattern);
    });
  });

  describe('getTimezoneFromDate', () => {
    it('should return the timezone from the date', () => {
      const timezone = getTimezoneFromDate(getDate());
      expect(timezone).to.match(timezonePatternWithSeparator);
    });
  });

  describe('isValidIsoDateWithTimezone', () => {
    it('should return true if the date is valid', () => {
      expect(isValidIsoDateWithTimezone('2022-01-01T00:00:00-06:00')).to.be.true;
    });

    it('should return false if the date is invalid', () => {
      expect(isValidIsoDateWithTimezone('2022-01-01X00:00:00-0600')).to.be.false;
    });
  });

  describe('extractOffsetFromISO', () => {
    it('should return the offset from the ISO string', () => {
      expect(extractOffsetFromISO('2022-01-01T00:00:00-06:00')).to.equal('-06:00');
    });

    it('should return null if the offset is not found', () => {
      expect(extractOffsetFromISO('2022-01-01T00:00:00-0600')).to.be.null;
    });
  });

  describe('convertOffsetToTimezone', () => {
    it('should convert the offset to a timezone', () => {
      expect(convertOffsetToTimezone('-06:00')).to.equal('-0600');
    });
  });

  describe('timestampIsSec', () => {
    it('should return true if the timestamp is in seconds', () => {
      expect(timestampIsSec(1640995200)).to.be.true;
    });

    it('should return false if the timestamp is not in seconds', () => {
      expect(timestampIsSec(1640995200000)).to.be.false;
    });
  });

  describe('timestampIsMs', () => {
    const nowMs = Date.now();

    it('should return true if the timestamp is in milliseconds', () => {
      expect(timestampIsMs(nowMs)).to.be.true;
    });

    it('should return false if the timestamp is not in milliseconds', () => {
      expect(timestampIsMs(nowMs / 1000)).to.be.false;
    });
  });
});