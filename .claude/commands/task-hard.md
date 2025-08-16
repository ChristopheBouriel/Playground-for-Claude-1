---
description: Run a task
---

For the given $ARGUMENTS you need to get the information about the tasks you need to do :
- If it's a file path, get the path to get the instructions and the feature we want to create
- If it's an issue number or URL, fetch the issues to get the information (with `gh cli`)

Use the workflow `EPCT` to make this task.


## Explore
First, use parallel subagents to find and read all files that may be useful for the implementation, either as examples or as edit targets. The subagents should return relevant file paths, and any other info that be useful. They can use Context7 among other things.


## Plan
Next, think hard and write up a detailed implementation plan. Don't forget to include tests and documentation.
Use your judgment as to what is necessary, given the standards of this repo.

If they are things you're not sure about, use parallel subagents to do some web research. They should only return useful informations, no noise.

If there are things you still do not understand or questions you have for the user, pause here to ask them before continuing.


## Code
When you have a thorough implementation plan, you are ready to start writing the code. Follow the style of the existing codebase (e.g. we prefer clearly named variables and methods to extensive content). Make sure to run the linter and fix the warnings that seem reasonable for you.


## Test
If there are tests in the project, create tests according to what you implemented and run them.
If something doesn't work properly, try hard to fix it.

If your changes impact the UX in a major way, use the browser to make sure that everything works correctly. Make a list of what to test for, and use a subagent for this step.

If your testing shows some problems, go back to the planning stage and think very hard about that.


## Create pull request
After everything is done, create a pull request with the changes and commit your changes following commitizen format.


## Write up your work
When you are satisfied about your work, write up a concise report. Include what you set out to do, the choices you made with their brief justification, and any command you ran in the process that may be useful for future developpers to know about.
