import java.io.IOException;
import java.net.URL;
import java.util.Arrays;
import java.util.Scanner;
import java.util.stream.IntStream;

public class AOC5 {
    private Scanner input;
    public AOC5(URL url) {
        try {
            input = new Scanner(url.openStream());
        } catch (IOException e) {
            throw new IllegalArgumentException("url not found", e);
        }
    }

    public String[] parseStackDesc() {
        String[] stack = null;
        for (String stackLine = input.nextLine(); stackLine.length() > 0; stackLine = input.nextLine()) {
            if (stackLine.charAt(1) == '1')
                continue;
            final String line = stackLine;
            final String[] lastStack = stack;
            stack = IntStream.iterate(1, i -> (i < line.length()), i -> i+4)
                .mapToObj(i -> (line.charAt(i) + ((lastStack != null) ? lastStack[i/4] : "")).trim())
                .toArray(String[]::new);
        }
        return stack;
    }

    public String[] parseMoves(final String[] initialStack) {
        String[] stack = Arrays.stream(initialStack).toArray(String[]::new);
        for (String moveDesc = input.nextLine(); input.hasNextLine(); moveDesc = input.nextLine()) {
            final var moveParts = moveDesc.split(" ");
            final var count = Integer.valueOf(moveParts[1]);
            final var from = Integer.valueOf(moveParts[3])-1;
            final var to = Integer.valueOf(moveParts[5])-1;
            
            for (var i = 0; i < count; i++) {
                final char moved = stack[from].charAt(stack[from].length() - 1);
                stack[from] = stack[from].substring(0,stack[from].length() - 1);
                stack[to] += moved;
            }
        }
        return stack;
    }

    public String[] parseMultiMoves(final String[] initialStack) {
        String[] stack = Arrays.stream(initialStack).toArray(String[]::new);
        for (String moveDesc = input.nextLine(); input.hasNextLine(); moveDesc = input.nextLine()) {
            final var moveParts = moveDesc.split(" ");
            final var count = Integer.valueOf(moveParts[1]);
            final var from = Integer.valueOf(moveParts[3])-1;
            final var to = Integer.valueOf(moveParts[5])-1;
            
            final String moved = stack[from].substring(stack[from].length() - count);
            stack[from] = stack[from].substring(0,stack[from].length() - count);
            stack[to] += moved;
        }
        return stack;
    }

    public static void main(String[] args) {
        try {
            AOC5 part1 = new AOC5(new URL(new URL("file:"), "./input5.txt"));
            var part1FinalStack = part1.parseMoves(part1.parseStackDesc());
            System.out.println("Part 1: " + Arrays.stream(part1FinalStack)
                .reduce("",
                    (str, stack) -> str + (stack.isEmpty() ? "" : stack.charAt(stack.length() - 1)),
                    (s1,s2) -> s1 + s2));

            AOC5 part2 = new AOC5(new URL(new URL("file:"), "./input5.txt"));
            var part2FinalStack = part2.parseMultiMoves(part2.parseStackDesc());
            System.out.println("Part 2: " + Arrays.stream(part2FinalStack)
                .reduce("", 
                    (str, stack) -> str + (stack.isEmpty() ? "" : stack.charAt(stack.length() - 1)),
                    (s1,s2) -> s1 + s2));
        } catch (IOException e) {
            throw new IllegalArgumentException("bad url", e);
        }
    }
}
