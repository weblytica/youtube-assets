# Make AI Agents Save to Dropbox
URL: https://www.youtube.com/watch?v=yCMhwVpvNQU

How much work have you lost because you
forgot to save a clogged conversation
somewhere you could find it again
easily? Or worse, you copied the output,
you switched to Dropbox, you pasted it,
you realized you forgot the name you're
going to call it, you went back to
Claude and completely lost your train of
thought. Today, I'm going to show you
how to tell Claude, "Save this to
Dropbox" in plain English, and Make.com
handles the rest. No copy and paste, no
switching apps, and no lost work.
Without this, you risk losing data,
killing your productivity, and pulling
your hair out. I use this automation
personally every single day. I'm in
Clawude a lot every day, and I really
love this automation. But the problem is
there's a lack of quality make AI agent
documentation, which made it really
brutal to figure out on my own. I even
started a video a couple days ago to
show you how to do it. And I hit a
massive roadblock, threw that video
away, and had to work on it some more
before I could actually show you how
this works. I had to make it work first.
So, I'm going to walk you through
exactly how it works. We'll cover how
the automation works behind the scenes
and how to use natural language commands
and the file name conventions that
organizes everything. You'll need a
Make.com scenario, and I'll show you
what it does and how to build it from
scratch. By the end of this video,
you'll be able to talk to Claude
naturally. Save this as my project notes
or save this and give it a file name and
your work automatically goes to a
Dropbox folder of your choosing. No more
lost conversations and no more context
switching. Okay, let's talk about the
tools we're going to use in this video.
Get all on the same page here. We're
going to use Claude AI. This is
Anthropic's AI assistant. If you're
watching this, you're probably already
using it for research or content
creation, or at least you're using
something like chat GPT. Make.com is a
visual automation platform that connects
apps together without using code. This
make AI agent bridges them together
between claude and make so you can
trigger Dropbox files to be saved on
command. Okay, so let me talk through
exactly what we're going to build in
this scenario so you know exactly what's
going to happen. I have a chat here with
Claude where I did some African elephant
research and so I said research African
elephants very general very broad and it
brought me back some data. What I was
able to do is say save to Dropbox as
African elephant research and that's the
file name that I wanted to give it. You
notice I didn't have to format it. Uh
that's all going to be taken care of
between AI and make and it's going to
save this as a markdown file. What
happens next is this is the step you're
going to see kind of fly by. This is
Claude preparing the data to send over
to the make AI agent. So here is the
make AI agent that I have set up.
There's a system prompt here that
frankly was my big roadblock of why I
threw the first video of this away
because I wasn't getting the system
prompt the way I wanted it to be. And so
I had to actually go build a clawed
project to build those because this
improved when I tried to use it a couple
days ago. It didn't even work. It just
gave me an error. It said, "Sorry, can't
work. Let us work on it." We're going to
use Claude to build this and then uh
we're going to put it in here as our
system prompts. Now down here is one
scenario that I've added. Yes, this is a
very simple implementation of an AI
agent. I wanted to keep this simple for
those of you like maybe like me that are
kind of waiting into this for the first
time. Let's keep it simple. Let's master
the basics and then we could get more
complicated with our agents. This is the
scenario. And if I jump over here, it
looks like this. This starts a scenario.
This is the data coming from Claude. It
uploads to Dropbox and then it sends
data back to Claude with this with this
module here. We're going to look at this
in more detail and then it's going to
drop the file into whatever Dropbox
folder you suggest. Now, you can give it
a like a parent folder and say create a
new folder and put it in there or figure
out the folder you want it to go in
there. In this case, again, just to keep
it simple and to eliminate as many
variables as possible, I'm telling it to
save it in a particular folder in
Dropbox. So, after the first failed
version of this video, I went over to
Claude and I built a project that would
create system prompts for AI agents. And
what I started with is as much research
as I could do about AI agents with
prompts. And pulled it in here and I
said, "Okay, I want you to help me write
these prompts so that they work better
than what I can write myself." So, I
have two projects that I use to do this.
First is my project building project for
Claude. You can find the instructions
for that and all of these resources in
the public GitHub repository folder that
is linked in this video. So that is the
how to create a project with a project
and then this is the project that came
from that. So I will also share the
instructions for this and where that
goes if you go back to the main page is
right here in instructions. This is what
makes this work. So, this is a long
prompt here with all kinds of details,
the things you want it to say, and that
goes up here in the system instructions.
I've also added a writing effective
system prompts for make.com AI agents.
This is the original research that I
got. See, there's quite a bit here. I
will include that as well. So, I
included that that that raw research as
a text file as a part of this project,
but then I use that to create the
instructions. So, this has done a pretty
good job just in my limited use of
building this a couple days ago. Both
the these instructions and this file
will be available in the GitHub
repository. Now, I don't want to bore
you by watching me prompt and and build
this, but basically here's here's what I
said. I want to create an AI agent that
will call a make.com scenario and save
the data to Dropbox. If a file name is
provided, use that. Otherwise, name the
file automatically. I wanted it to
create a file name if I forgot or I
wanted to if I have really specific file
name I wanted to be able to give it to
that. Here is the blueprint of the
scenario we will be calling. So I
actually built the scenario first.
Downloaded the blueprint and dropped it
in here. It has the instructions on how
to write it. It has the blueprint of the
scenario that I've built so it knows
what's going on in make. And then it
wrote a a pretty good system prompt for
my AI agent. Did a pretty good job. So
all of this will be in the GitHub
repository. You can grab that and put
that into your cloud. And then when I
was done, I dropped it right into here
into the system prompts. Now down here
is my scenario. And the way you add one
of those is you click add tap scenario.
And then this is important. It has to be
on demand or a web hook. You can't have
a scheduled scenario that's running. It
has to be one of those two triggers. So
if you look over here at my scenario
real quick, this little arrow, this
means it's an ondemand scenario. So it
is never going to run until something
actually reaches out and says, "Hey, I
need to trigger you to run and do
something for me." And that's going to
be done by Claude. So you select your
scenario here. It's just a drop down.
And this is all of the scenarios you
have that are web hook or on demand
scenarios. So you can search by name or
ID right here. So this one's already
added. Let's go look at that. If you
click this right here, you can go look
at it. Let's look at the gear first. And
so what this is, it's just a short
description that that tells the system
this is what this scenario is meant to
do. Now we're going to click on this
arrow right here and we're going to open
up the scenario. And this is essentially
a one module scenario, but we have the
inputs coming from Claude and the
outputs going back to Claude. So that's
that's the purpose of these two purple
ones. What you want to do is you have to
manage the data that you're receiving
from Claude. So let me go show you in my
system prompt here down at the bottom
right here tool usage call call the
Dropbox to save tool with two parameters
file name and document data. So Claude's
going to send data and then that has to
match over in make. So the scenario
inputs are right down here. This little
icon here not even sure what to call it.
Uh so here here are inputs and outputs.
So, we're going to go here to our inputs
and we're going to expand this. And you
can see file name that exactly matches
this name here. And this one should be
document data with capital D's and an
underscore. We look down here. Document
data with underscores and the capital
D's. Now, you cannot put spaces in
these. If you want a space, you need to
put an underscore or you just need to
keep it without spaces. So, what we have
here is our file name. It is text. Uh,
we're not going to put a default value
in. It is required. means if it doesn't
come through it's not going to run. And
our second one is document data. It's
text and it is required and it's
multi-line. So those are the two inputs
that are coming in. Remember that we
don't have a module in front of this in
front of our Dropbox module giving us
the inputs. It's coming from somewhere
else. And so we have to just define
this. Claude knows what to send and then
it grabs this and runs it through. Okay.
So just for another safety and a check
here, I said I only want this to run if
the document data and file name exist.
This filter is redundant because in our
step one, we're saying both of those
have to be required anyway. But I I just
put this in here just in the off chance
it runs anyway and doesn't have that
data. All right, so here's our Dropbox
setup. Pretty pretty straightforward
connection. If you don't have a
connection to Dropbox yet, you'll have
to click add or you can use an existing
connection. And then again, I am mapping
this to a specific folder. My use case
for this is I want to save my claude
project instructions in Dropbox. Right
now, all of my projects have
instructions that are only saved in
Claude, and I need to start saving those
in Dropbox to have a backup of those.
This is a final use case for what we're
doing here. I know we're going to be
talking about Asian elephants and
African elephant research and that kind
of thing. That's just a test to get that
in there. But that's really the use case
is I want to save these project
instructions. Again, that goes back to
my project that I use to create
projects. I'm going to save those
instructions in there and then I'll copy
and paste them into a new project. So,
we're going to map here. So, we have
file name. The file name is right there.
It's coming from that first module.
You're going to map this basically the
same as you normally do. And then
document data is going to get dragged
into here. Save that. And then this is
our output. What we're going to do with
our output is recently, and I think this
came about because of AI agents, we have
this top option here that's a bundle,
and it just sends everything. You don't
have to map everything. It just sends
the world. All of this data here gets
sent with one variable in this output.
So, that's what we're going to put in
there. It's more data than than Claude
really needs, but that's the easiest way
to to get it to Claude. One thing about
outputs when you're going you're sending
data to Claude, you can only have one
output. The first one of these I built a
few months ago, I had like three or four
outputs and send this to Claude and it
just wouldn't work. And so I got rid of
all but one output and it worked. Again,
I couldn't find that in documentation
anywhere. But your output when you're
sending back to Claude, you only get one
variable and one variable only. So that
is our scenario. I'll also drop this
scenario blueprint in the repo that's
linked in this video. So, next I want to
show you how to connect your AI agent to
claude. So, we're going to go right over
here. We're going to click here and go
to settings. We're going to go to
connectors. So, I'm going to delete my
save project instructions to Dropbox
connection here. Going to remove that.
Disconnect. All right. Now, it's gone.
What I'm going to do here is I'm going
to copy one of these. So, I I only need
one URL
going to Claude from make. And so,
that's my MCP server. uh I'm sending
everything through that, but I can
define what scenario what scenarios show
up for that connection. So, I'm going to
copy this URL right here and I'm going
to say add custom connector and I'm
going to say YouTube test and I'm going
to show you what this looks like when
you put the entire URL in there. Under
advanced settings, you'll get a message
that says confirm that you trust this
connector and you can just go ahead and
click add. So, I have my I have my MCP
server URL that I got from my make API
key page. Uh there's probably great
videos on how to do that, but that's how
you that's where you go and get this
URL. And I'm going to click add. So,
it's called YT test. Now, if I go launch
a new chat here, I want to show you why
I didn't do it like this. So, I'm going
to click here and I'm going to go down
to YT test. And you can see here we have
10 of 40 that are turned on. All right,
these are all scenarios
from my clients from all teams. Like
this is this is madness. I don't want
all of these as options in claw. So
there's another way you can do this. So
let's go back to settings and
connectors. And I'm going to get rid of
that guy. I'm going to copy this URL
again. Now, I've dropped the the tail
end of this URL in here so I so I could
show it to you. At the end of your MCP
server URL, it's got your ID and
everything. It's it's got a slash SSE
and then what I've been adding is
scenario ID numbers and it limits what
shows up for that connection. So, you
can see here I have scenario ID, I have
square brackets, and then here is a
scenario ID. So, this is not the
scenario ID I want. I'm going to go back
up here and this is a scenario. It ends
in 702. I'm going to copy that and I'm
going to paste that right there. So, if
I want to include another scenario in
this, I can just copy this and then I'm
going to do an amperand and paste and
then I can put the next number of the
scenario in here that I want. Now, when
I create this connection in cloud, it'll
show two scenarios. If you're using the
same MCP server connection, like the URL
for each of these, you can just copy
this and then go paste it into Notepad
and just edit that. And then I'm going
to go here. I'm going to add custom
connector. So I'm going to call that P
OJ instruct to Dropbox. That's about all
that's going to show in Claude for this
name. So then I'm going to tab here and
I'm going to paste my URL. All right. So
now project instruction Dropbox. I've
created a new chat here and I'm going to
go right here on this little button and
I'm going to see here project
instruction Dropbox and if I go over
here there is one scenario there. So I
can turn this entire thing off out here
and what I would recommend you do is if
you have a grouping of scenarios that
are similar that you'd add them in
groups. For example, if there's
something else I wanted to do with a
make MCP server an AI agent that was
related to project instructions, I would
add it in this same one out here on this
screen. I can turn it off and on really
easily because there's only one scenario
in there. So, we have this turned on.
Uh, I'm going to turn off extended
thinking. Web search is on. All right.
Research largemouth bass. I'm a little
bit in a fishy mood today. So, we're
going to see the research this brings
back. just going and returning some
output based on what it's searching on
the web. And when we get done, we're
going to save this to our Dropbox
folder. Okay. So, here's our research
about largemouth bass. Uh quite a bit
there. So, I'm going to say save this to
Dropbox as largemouth bass research for
YouTube. Okay. So, here is what it's
going to send to make. So, you can see
our file name here. It has created that.
Took that from my name there. Uh here's
the document data. So that this is the
file name of the document data that's
being sent to that first module of our
scenario. Here is the data. So it gave
it a gave it a title based on my file
name that I gave it. And then here is
all the research in markdown format and
it's still generating that. All right.
So there's the end of our JSON. So this
is ready to go. When I click allow once,
it's going to jump over to make and run
it and then bring back the data from
make. I have this set up to allow once.
And if you do that, you can just hit
enter at this point. Uh you can always
allow, which I tend to not do that. I
don't trust Claude just that much quite
yet. Uh if you do, by all all means set
it to always allow. Then you wouldn't
see this step. So I'm going to hit enter
and then I'm going to jump over here and
we can see make is running and now it's
done. So let's jump back over to Claude.
Successfully save your largemouth bass
project to Dropbox. Now we're back over
here in Dropbox and you see there it is.
Largemouth bass researched for YouTube.
Uh so this is uh this is the result. Now
one of the things I will point out is I
was expecting this to come back all
lowercase with hyphens. This is a little
tweaking I'll need to do with either my
make scenario or my make AI agent system
prompt. It's a little bit of a dance
between the two and between Claude.
What's Claude sending? What's the AI
agent taking, you know, doing? And then
what's happening in this scenario? So,
sometimes you have to bounce across
those three entities to troubleshoot
this. But the last three times I ran
this, it gave me lowercase hyphenated
and this time it gave me exactly as I
typed it, it did save the file. That's
kind of a minor thing. The other thing I
want to add is a date to the beginning
of these files so I can know when they
were generated. Again, that's just a
little bit of tweaking. I could even do
that in make with a function in front of
the file name. Uh, and that would take
care of that as well. So, you've just
learned how to save cloud outputs to
Dropbox using standard English commands
and using an AI agent with make and a
make scenario. This should take 30 to 60
minutes to set up depending how many
roadblocks or issues you run into.
Hopefully, I provided you enough
information to get you around most of
those roadblocks, but there may be
things that come up. And if they do,
drop me a comment below and I'll try to
help you as much as I can over YouTube
troubleshoot those. You're always
welcome to book a call with me at
webtitica.com where we can work through
this with you as well. If this video was
valuable to you, tell YouTube that by
giving me a like and subscribe if you
want more videos about AI and automation
in the future. I appreciate you
watching. God bless you and I'll see you
next time.
