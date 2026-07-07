import { render, screen } from "@testing-library/react";

function SmokeSample() {
  return <div>calculator smoke</div>;
}

describe("smoke sample", () => {
  it("renders a testing-library component", () => {
    render(<SmokeSample />);

    expect(screen.getByText("calculator smoke")).toBeInTheDocument();
  });
});
