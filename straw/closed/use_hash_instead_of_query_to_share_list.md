# Use hash instead of query to share list

The hash part of the url is not sent to servers. This is a great feature to
keep shared data safer.

## Notes

- Keep backwards compatibility by supporting the append search param. Do this
  for atleast the duration that these urls are being used.

  #priority
