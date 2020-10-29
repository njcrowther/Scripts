-- Get file
tell application "Finder" to set nExt to name extension of file theFile

set itemPath to POSIX path of theFile
  -- Get creation date
  --set creationDate to creation date of theFile

  (*
  If it's a pdf, then convert to jpg
  *)
if (nExt is "pdf") then
  tell application "System Events"
    do shell script "/usr/local/bin/convert " & itemPath & longName & " " & itemPath & "separated-" & shortName & ".png"
  end tell

  -- do shell script "/usr/local/bin/convert " & itemPath & " " & itemPath & ".png"
end if





(*
tell application "System Events"
do shell script "usr/local/bin/convert " & home_path_posix & longName & "'(Black)'.tif -compress lzw -depth 8 -colorspace Gray " & home_path_posix & "separated-Black.tif"
end tell
*)


(*
Resources
https://stackoverflow.com/questions/24453867/applescript-to-if-then-determine-file-type-and-choose-correct-program-to-open

https://macscripter.net/viewtopic.php?id=38288

https://discussion.evernote.com/topic/95020-hazel-applescript-to-change-note-creation-date/

https://macscripter.net/viewtopic.php?id=18375

http://www.multipole.org/discourse-server/viewtopic.php?t=24493
)
