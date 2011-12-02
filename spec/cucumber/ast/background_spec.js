require('../../support/spec_helper');

describe("Cucumber.Ast.Background", function() {
  var Cucumber = requireLib('cucumber');
  var steps;
  var background, keyword, name, description, line, lastStep;

  beforeEach(function() {
    keyword     = createSpy("background keyword");
    name        = createSpy("background name");
    description = createSpy("background description");
    line        = createSpy("starting background line number");
    lastStep    = createSpy("Last step");
    steps       = createSpy("Step collection");
    spyOnStub(steps, 'add');
    spyOnStub(steps, 'getLast').andReturn(lastStep);
    spyOn(Cucumber.Type, 'Collection').andReturn(steps);
    background = Cucumber.Ast.Background(keyword, name, description, line);
  });

  describe("constructor", function() {
    it("creates a new collection to store steps", function() {
      expect(Cucumber.Type.Collection).toHaveBeenCalled();
    });
  });

  describe("getKeyword()", function() {
    it("returns the keyword of the background", function() {
      expect(background.getKeyword()).toBe(keyword);
    });
  });

  describe("getName()", function() {
    it("returns the name of the background", function() {
      expect(background.getName()).toBe(name);
    });
  });

  describe("getDescription()", function() {
    it("returns the description of the background", function() {
      expect(background.getDescription()).toBe(description);
    });
  });

  describe("getLine()", function() {
    it("returns the line on which the background starts", function() {
      expect(background.getLine()).toBe(line);
    });
  });

  describe("addStep()", function() {
    it("adds the step to the steps (collection)", function() {
      var step = createSpy("step AST element");
      background.addStep(step);
      expect(steps.add).toHaveBeenCalledWith(step);
    });
  });

  describe("getLastStep()", function() {
    it("gets the last step from the collection", function() {
      background.getLastStep();
      expect(steps.getLast).toHaveBeenCalled();
    });

    it("returns that last step from the collection", function() {
      expect(background.getLastStep()).toBe(lastStep);
    });
  });

  describe("getSteps()", function() {
    it("returns the steps", function() {
      expect(background.getSteps()).toBe(steps);
    });
  });
});
