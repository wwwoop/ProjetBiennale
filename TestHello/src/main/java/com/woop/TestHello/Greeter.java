package com.woop.TestHello;

/**
 * Class définissant le contenu
 *
 */
public class Greeter {

    private final long id;
    private final String content;

    public Greeter(long id, String content) {
        this.id = id;
        this.content = content;
    }

    public long getId() {
        return id;
    }

    public String getContent() {
        return content;
    }
}
